import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyContact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    ContactsPermission();
  }, []);

  const ContactsPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status === 'granted') {
        allContacts();
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      } else {
        console.log('No contacts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Search = (text) => {
    setSearchName(text);
  };

  const ContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const ClosePopup = () => {
    setSelectedContact(null);
  };

  const filteredContacts = contacts.filter((contact) => {
    const contactName = contact.name.toLowerCase();
    const searchLowercase = searchName.toLowerCase();
    return contactName.includes(searchLowercase);
  });

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          onChangeText={Search}
        />
        {filteredContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            onPress={() => ContactClick(contact)}
            style={styles.contactItem}
          >
            <View style={styles.contactContainer}>
              <FontAwesome name="user" size={30} color="black" style={styles.contactIcon} />
              <Text style={styles.contactName}>{contact.name}</Text>
              <FontAwesome name="phone" size={30} color="black" style={styles.contactIcon1} />
            </View>
          </TouchableOpacity>
        ))}
        <Modal visible={selectedContact !== null} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>{selectedContact?.name}</Text>
              {selectedContact?.phoneNumbers.map((number) => (
                <Text style={styles.numberstyle} key={number.id}><FontAwesome name="phone" size={20} color="black" style={styles.contactIcon2} />{number.number}</Text>
              ))}
              <TouchableOpacity style={styles.closeButton} onPress={ClosePopup}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 10,
  },
  contactIcon1: {
    marginLeft: 'auto',
  },
  contactIcon2: {
    marginRight:'auto',
  },
  contactName: {
    fontSize: 16,
  },
  searchInput: {
    height: 60,
    borderColor:'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  contactItem: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    marginTop: 8,
    marginRight:3,
    marginLeft:3,
    borderRadius:4,
    shadowColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'darkgrey',
    padding: 60,
    borderRadius: 8,
  },
  popupTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  numberstyle: {
    color: 'white',
  },
  closeButton: {
    marginTop: 50,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
  },
  callButtonText: {
    color: 'blue',
  }
});

export default MyContact;