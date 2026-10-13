import { CreatePostDto } from '../../application/dto/create-post.dto';
import { UpdatePostDto } from '../../application/dto/update-post.dto';

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
