import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Keyboard,
  ActivityIndicator,
  Modal,
} from 'react-native';

import CartCheckoutWrapper from '../Cart/CartCheckoutWrapper';

import {
  useAddDeliveryAddressMutation,
  useGetUserDileveryAddressQuery,
} from '../../ReduxToolKit/Api/PaymentApi';

const AddressScreen = ({ route, navigation }: any) => {
  const { cartItems, totalAmount, userId } = route.params;

  console.log(cartItems, totalAmount, userId);

  const { data, isLoading, refetch } = useGetUserDileveryAddressQuery({
    userId,
  });

  const [addAddress, { isLoading: adding }] = useAddDeliveryAddressMutation();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    house: '',
    area: '',
    city: '',
    pincode: '',
    type: 'Home',
  });

  const addresses =
    data?.data?.map((item: any) => ({
      id: item._id,
      label: item.type,
      address: `${item.houseVillage}, ${item.areaStreet}, ${item.city} - ${item.pincode}`,
      name: item.name,
      phone: String(item.phone),
    })) || [];

  const selected = addresses.find((a: any) => a.id === selectedAddressId);

  const handleSave = async () => {
    const { name, phone, house, area, city, pincode, type } = form;

    if (!name || !phone || !house || !area || !city || !pincode) {
      return Alert.alert('Fill all fields');
    }

    try {
      await addAddress({
        userId,
        name,
        phone: Number(phone),
        houseVillage: house,
        areaStreet: area,
        city,
        pincode: Number(pincode),
        type: type.toLowerCase(),
      }).unwrap();

      Keyboard.dismiss();
      refetch();
      setShowModal(false);

      setForm({
        name: '',
        phone: '',
        house: '',
        area: '',
        city: '',
        pincode: '',
        type: 'Home',
      });
    } catch {
      Alert.alert('Failed to add address');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CartCheckoutWrapper
      title="Address"
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Select Delivery Address</Text>

        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          {addresses.map((item: any) => {
            const active = item.id === selectedAddressId;

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, active && styles.activeCard]}
                onPress={() => setSelectedAddressId(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.label}</Text>
                    <Text style={styles.cardSub}>
                      {item.name} • {item.phone}
                    </Text>
                    <Text style={styles.cardAddress}>{item.address}</Text>
                  </View>

                  {active && <View style={styles.radio} />}
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.addText}>+ Add New Address</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={[styles.cta, !selected && { opacity: 0.5 }]}
          disabled={!selected}
          onPress={() => {
            const formattedItems = cartItems.map((item: any) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            }));

            navigation.navigate('paymentScreen', {
              userId,
              addressId: selected?.id,
              items: formattedItems,
              totalAmount,
            });
          }}
        >
          <Text style={styles.ctaText}>Deliver Here & Continue</Text>
        </TouchableOpacity>

        <Modal visible={showModal} transparent animationType="slide">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View style={styles.overlay}>
              <View style={styles.sheet}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Add Address</Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Text style={{ fontSize: 20 }}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.section}>Contact Details</Text>

                  <TextInput
                    placeholder="Full Name"
                    value={form.name}
                    onChangeText={t => setForm({ ...form, name: t })}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    value={form.phone}
                    onChangeText={t => setForm({ ...form, phone: t })}
                    style={styles.input}
                  />

                  <Text style={styles.section}>Address</Text>

                  <TextInput
                    placeholder="House / Flat"
                    value={form.house}
                    onChangeText={t => setForm({ ...form, house: t })}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Area / Street"
                    value={form.area}
                    onChangeText={t => setForm({ ...form, area: t })}
                    style={styles.input}
                  />

                  <View style={styles.row}>
                    <TextInput
                      placeholder="City"
                      value={form.city}
                      onChangeText={t => setForm({ ...form, city: t })}
                      style={[styles.input, { flex: 1 }]}
                    />

                    <TextInput
                      placeholder="Pincode"
                      keyboardType="number-pad"
                      value={form.pincode}
                      onChangeText={t => setForm({ ...form, pincode: t })}
                      style={[styles.input, { flex: 1 }]}
                    />
                  </View>

                  <View style={styles.chips}>
                    {['Home', 'Work', 'Other'].map(type => {
                      const active = form.type === type;
                      return (
                        <TouchableOpacity
                          key={type}
                          style={[styles.chip, active && styles.chipActive]}
                          onPress={() => setForm({ ...form, type })}
                        >
                          <Text
                            style={
                              active ? styles.chipTextActive : styles.chipText
                            }
                          >
                            {type}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <TouchableOpacity style={styles.save} onPress={handleSave}>
                    {adding ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.saveText}>Save Address</Text>
                    )}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </CartCheckoutWrapper>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },

  header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },

  activeCard: {
    borderWidth: 1,
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },

  cardRow: { flexDirection: 'row', alignItems: 'center' },

  cardTitle: { fontWeight: '700', fontSize: 14 },

  cardSub: { fontSize: 12, marginTop: 4 },

  cardAddress: { fontSize: 12, color: '#666', marginTop: 6 },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#16a34a',
  },

  addBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },

  addText: { color: '#16a34a', fontWeight: '600' },

  cta: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  ctaText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },

  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sheetTitle: { fontSize: 18, fontWeight: '700' },

  section: { fontSize: 13, fontWeight: '700', marginTop: 12 },

  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    backgroundColor: '#fafafa',
  },

  row: { flexDirection: 'row', gap: 10 },

  chips: { flexDirection: 'row', marginTop: 14 },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },

  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },

  save: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  saveText: { color: '#fff', fontWeight: '700' },

  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
