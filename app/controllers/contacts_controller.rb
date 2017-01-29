class ContactsController < ApplicationController
  def new
    @contact = Contact.new
    render :new
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      flash[:notice] = ["Message successfully sent! Thank you :)"]
      redirect_to suggestions_url
    else
      flash.now[:errors] = @contact.errors.full_messages
      render :new
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :message)
  end
end
