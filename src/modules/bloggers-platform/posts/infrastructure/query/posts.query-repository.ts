import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PostModelType } from '../../domain/post.entity';
import { Post } from '../../domain/post.entity';
import { PostViewDto } from '../../api/view-dto/posts.view-dto';
import { GetPostsQueryParams } from '../../api/input-dto/get-posts-query-params.input-dto';
import { QueryFilter } from 'mongoose';
import { PaginatedViewDto } from '../../../../../core/dto/base.paginated.view-dto';

@Injectable()
export class PostsQueryRepository {
  constructor(@InjectModel(Post.name) private PostModel: PostModelType) {}

  async getByIdOrNotFoundFail(id: string): Promise<PostViewDto> {
    const post = await this.PostModel.findById(id).lean();

    if (!post) throw new NotFoundException('Post not found');

    return PostViewDto.mapToView(post);
  }

  async getAll(
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const filter: QueryFilter<Post> = {};

    const [posts, totalCount] = await Promise.all([
      this.PostModel.find(filter)
        .sort({ [query.sortBy]: query.sortDirection })
        .skip(query.calculateSkip())
        .limit(query.pageSize),

      this.PostModel.countDocuments(filter),
    ]);

    const items = posts.map(PostViewDto.mapToView);

    return PaginatedViewDto.mapToView({
      page: query.page,
      pageSize: query.pageSize,
      totalCount,
      items,
    });
  }

  async getAllPostsOfBlog(
    blogId: string,
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const filter: QueryFilter<Post> = { blogId };

    const [posts, totalCount] = await Promise.all([
      this.PostModel.find(filter)
        .sort({ [query.sortBy]: query.sortDirection })
        .skip(query.calculateSkip())
        .limit(query.pageSize),

      this.PostModel.countDocuments(filter),
    ]);

    const items = posts.map(PostViewDto.mapToView);

    return PaginatedViewDto.mapToView({
      page: query.page,
      pageSize: query.pageSize,
      totalCount,
      items,
    });
  }
}
