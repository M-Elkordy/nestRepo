import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { SignInUser, SignOutReturn, SignUpUser, UpdatedUser, User, Users, UserToken } from './models/users.model';
import { exportJwtTokenFromRequest } from 'src/helpers/jwt-token.helper';

@Resolver()
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(returns => Users)
    async getUsersByEmail(@Context() context: any, @Args('email') email?: string) {
        const token = exportJwtTokenFromRequest(context);
        const users = await this.usersService.getUsersByEmail(token, email);
        console.log(users);
        return users;
    }

    @Query(returns => User)
    async getUserById(@Context() context: any, @Args('id') id: string) {
        const token = exportJwtTokenFromRequest(context);
        const user = await this.usersService.getUserById(token, id);
        return user;
    }

    @Mutation(returns => User)
    async updateUser(@Context() context: any, @Args('id') id: string, @Args('user') user: UpdatedUser) {
        const token = exportJwtTokenFromRequest(context);
        return await this.usersService.updateUser(token, id, user);
    }

    @Mutation(returns => User)
    async deleteUser(@Context('context') context: any, @Args('id') id: string) {
        const token = exportJwtTokenFromRequest(context);
        return await this.usersService.deleteUser(token, id);
    }

    @Mutation(returns => UserToken)
    async userSignIn(@Args('user') user: SignInUser) {
        return await this.usersService.signIn(user);
    }

    @Mutation(returns => User)
    async userSignUp(@Args('user') user: SignUpUser, @Context() context: any) {
        return await this.usersService.signUp(user);
    }

    @Mutation(returns => SignOutReturn)
    userSignOut(@Context()context: any) {
        const token = exportJwtTokenFromRequest(context);
        return this.usersService.signOut(token);
    }
}
