import Address from '../model/address.model';
import IAddress from '../utilis/interface/IAddress';

//created address

async function createAddress(addressData: IAddress) {
  try {
    const address = new Address(addressData);
    await address.save();
    return address;
  } catch (error) {
    throw error;
  }
}

//get address by id

async function getAddressById(addressId: string) {
  try {
    const address = await Address.findById(addressId);
    return address;
  } catch (error) {
    throw error;
  }
}

//update address

async function updateAddress(addressId: string, updatedAddressData: IAddress) {
  try {
    const address = await Address.findByIdAndUpdate(addressId, updatedAddressData, { new: true });
    return address;
  } catch (error) {
    throw error;
  }
}

//delete address

async function deleteAddress(addressId: string) {
  try {
    await Address.findByIdAndDelete(addressId);
  } catch (error) {
    throw error;
  }
}
export { createAddress, getAddressById, updateAddress, deleteAddress };
