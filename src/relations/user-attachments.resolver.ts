import { Resolver, ResolveProperty, Query, Args, Parent } from '@nestjs/graphql';
import { UserAttachment } from '../models/db/relations/user-attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '../models/db/attachment.entity';
import { User } from '../models/db/user.entity';

@Resolver(() => UserAttachment)
export class UserAttachmentsResolver {
    constructor(
        @InjectRepository(UserAttachment)
        private readonly userAttachmentsRepository: Repository<UserAttachment>,
        @InjectRepository(Attachment)
        private readonly attachmentsRepository: Repository<Attachment>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    @Query(returns => UserAttachment, { name: 'userAttachment' })
    async getUserAttachment(@Args('id') id: number) {
        return this.userAttachmentsRepository.findOne(id);
    }

    @ResolveProperty('attachment', () => [Attachment])
    async getAttachment(@Parent() userAttachment) {
        const { attachmentId } = userAttachment;
        return this.attachmentsRepository.findOne(attachmentId);
    }

    @ResolveProperty('user', () => [User])
    async getUser(@Parent() userAttachment) {
        const { userId } = userAttachment;
        return this.usersRepository.findOne(userId);
    }
}
