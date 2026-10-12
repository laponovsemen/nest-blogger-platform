import { CreateBlogDto } from '../../dto/create-blog.dto';
import { UpdateBlogDto } from '../../dto/update-blog.dto';

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
