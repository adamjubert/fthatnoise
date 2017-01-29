class ContactsController < ApplicationController
  before_action :only_admin_can_see_contacts, only: [:index]

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

  def index
    @contacts = Contact.all
    render :index
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :message)
  end

  def only_admin_can_see_contacts
    redirect_to new_contact_url unless admin?
  end
end
