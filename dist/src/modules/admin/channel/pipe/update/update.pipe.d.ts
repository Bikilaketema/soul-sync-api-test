import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { UpdateChannelDto } from '../../dto/update-channel.dto';
export declare class UpdatePipe implements PipeTransform {
    transform(value: UpdateChannelDto, metadata: ArgumentMetadata): UpdateChannelDto;
}
