class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :find_user, only: [:get]
  skip_before_action :authorized, only: [:create]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # GET /user/username
  def get
    #byebug
    if @user
      render json: @user
    else
      render json: {message: "Could not find user with username '#{params[:username]}'"}, status: :not_found
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Finds a user based on username
    def find_user
      @user = User.find_by(username: params[:username])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :avatar, :email, :display_name, :bio, :twitter_name, :instagram_name, :youtube_name)
    end
end
