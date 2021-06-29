class UsersController < ApplicationController
    def index
        render json: User.all
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def update
        user = User.find(params[:id])

        user.update(avatar: params[:avatar])
        user.save

        render json: user
    end
    
end
