class Api::ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render json: ["Message received! Thank you for reaching out to us :)"]
    else
      render json: @contact.errors.full_messages, status: 422
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :message)
  end
end
