import { Body, Controller, Get, Post, Query} from '@nestjs/common';
import { IMediator, Result } from '@softobiz-df/shared-lib';
import { UserCreateCommand } from '../use-cases/user/commands/user/user.cmd';
import { UserCreateResponseType } from '../use-cases/user/commands/user/user.response.type';
import { GetUserQuery } from '../use-cases/user/queries/user/user.query';
import { GetUserReponseType } from '../use-cases/user/queries/user/user.response.type';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly _mediator: IMediator) {}

  
	@Post('create')
	async createUser(@Body() payload: UserCreateCommand): Promise<UserCreateResponseType> {
		return this._mediator.send<UserCreateResponseType>(new UserCreateCommand(payload))
	}


  @ApiQuery({name: 'id',description: 'Gets the Action id'})
	@Get()
	async getUser(@Query("id") id): Promise<GetUserReponseType> {
		return this._mediator.send<GetUserReponseType>(new GetUserQuery({ id }))

	}

	@Get("health")
    async getHealth(): Promise<Result<string>> {
        return Result.ok(" Service running ")

    }
}
