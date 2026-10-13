import { CreateBlogDto } from '../../application/dto/create-blog.dto';
import { UpdateBlogDto } from '../../application/dto/update-blog.dto';

export class CreateBlogInputDto implements CreateBlogDto {
  name: string;
  description: string;
  websiteUrl: string;
}

export class UpdateBlogInputDto implements UpdateBlogDto {
  name: string;
  description: string;
  websiteUrl: string;
}
