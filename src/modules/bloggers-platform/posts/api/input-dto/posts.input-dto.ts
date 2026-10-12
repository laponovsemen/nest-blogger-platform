import { CreatePostDto } from '../../dto/create-post.dto';
import { UpdatePostDto } from '../../dto/update-post.dto';

export class CreatePostInputDto implements CreatePostDto {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export class UpdatePostInputDto implements UpdatePostDto {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}
