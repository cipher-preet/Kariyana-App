import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import CartCheckoutWrapper from '../Cart/CartCheckoutWrapper';
import {
  useAddDeliveryAddressMutation,
  useGetUserDileveryAddressQuery,
} from '../../ReduxToolKit/Api/PaymentApi';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

const ACTIVE_GREEN = '#0B6B3A';

const PlusIcon = ({ color = ACTIVE_GREEN }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
    />
  </Svg>
);

const CloseIcon = ({ color = Colors.gray700 }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="m7 7 10 10M17 7 7 17"
      stroke={color}
      strokeWidth={2.3}
      strokeLinecap="round"
    />
  </Svg>
);

const CheckIcon = ({ color = Colors.white }) => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
    <Path
      d="m7 12 3 3 7-7"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LocationIcon = ({ color = ACTIVE_GREEN }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={10} r={2.4} stroke={color} strokeWidth={2} />
  </Svg>
);

const AddressScreen = ({ route, navigation }: any) => {
  const { cartItems, totalAmount, userId } = route.params;
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

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      house: '',
      area: '',
      city: '',
      pincode: '',
      type: 'Home',
    });
  };

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
      await refetch();
      setShowModal(false);
      resetForm();
    } catch {
      Alert.alert('Failed to add address');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={ACTIVE_GREEN} />
        <Text style={styles.loaderText}>Loading addresses</Text>
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {addresses.length === 0 ? (
            <View style={styles.emptyCard}>
              <LocationIcon color={Colors.gray500} />
              <Text style={styles.emptyTitle}>No saved address</Text>
              <Text style={styles.emptyText}>Add an address to continue.</Text>
            </View>
          ) : (
            addresses.map((item: any) => {
              const active = item.id === selectedAddressId;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.card, active && styles.activeCard]}
                  onPress={() => setSelectedAddressId(item.id)}
                  activeOpacity={0.86}
                >
                  <View style={styles.cardRow}>
                    <View style={styles.iconCircle}>
                      <LocationIcon />
                    </View>

                    <View style={styles.cardCopy}>
                      <Text style={styles.cardTitle}>{item.label}</Text>
                      <Text style={styles.cardSub}>
                        {item.name} | {item.phone}
                      </Text>
                      <Text style={styles.cardAddress}>{item.address}</Text>
                    </View>

                    <View style={[styles.radio, active && styles.radioActive]}>
                      {active ? <CheckIcon /> : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowModal(true)}
            activeOpacity={0.84}
          >
            <PlusIcon />
            <Text style={styles.addText}>Add New Address</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={[styles.cta, !selected && styles.ctaDisabled]}
          disabled={!selected}
          activeOpacity={0.86}
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
            style={styles.keyboardView}
          >
            <View style={styles.overlay}>
              <View style={styles.sheet}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Add Address</Text>
                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    style={styles.closeButton}
                    activeOpacity={0.8}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.section}>Contact Details</Text>
                  <AddressInput
                    placeholder="Full Name"
                    value={form.name}
                    onChangeText={(t: string) => setForm({ ...form, name: t })}
                  />
                  <AddressInput
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={form.phone}
                    onChangeText={(t: string) => setForm({ ...form, phone: t })}
                  />

                  <Text style={styles.section}>Address</Text>
                  <AddressInput
                    placeholder="House / Flat"
                    value={form.house}
                    onChangeText={(t: string) => setForm({ ...form, house: t })}
                  />
                  <AddressInput
                    placeholder="Area / Street"
                    value={form.area}
                    onChangeText={(t: string) => setForm({ ...form, area: t })}
                  />

                  <View style={styles.inputRow}>
                    <AddressInput
                      placeholder="City"
                      value={form.city}
                      onChangeText={(t: string) => setForm({ ...form, city: t })}
                      style={styles.halfInput}
                    />
                    <AddressInput
                      placeholder="Pincode"
                      keyboardType="number-pad"
                      value={form.pincode}
                      maxLength={6}
                      onChangeText={(t: string) =>
                        setForm({ ...form, pincode: t })
                      }
                      style={styles.halfInput}
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
                          activeOpacity={0.82}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              active && styles.chipTextActive,
                            ]}
                          >
                            {type}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <TouchableOpacity
                    style={styles.save}
                    onPress={handleSave}
                    activeOpacity={0.86}
                    disabled={adding}
                  >
                    {adding ? (
                      <ActivityIndicator color={Colors.white} />
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

const AddressInput = ({ style, ...props }: any) => (
  <TextInput
    placeholderTextColor={Colors.gray500}
    style={[styles.input, style]}
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F2',
    paddingHorizontal: Spacing.md,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
    marginBottom: Spacing.md,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.white,
    ...Shadows.soft,
  },
  activeCard: {
    borderColor: '#BFE5CB',
    backgroundColor: '#F7FCF8',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E9F8EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  cardCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: Spacing.sm,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.gray900,
    textTransform: 'capitalize',
  },
  cardSub: {
    fontSize: 12,
    marginTop: 3,
    color: Colors.gray700,
    fontWeight: '500',
  },
  cardAddress: {
    fontSize: 12,
    color: Colors.gray600,
    marginTop: 5,
    lineHeight: 17,
    fontWeight: '600',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: ACTIVE_GREEN,
    backgroundColor: ACTIVE_GREEN,
  },
  addBtn: {
    flexDirection: 'row',
    gap: Spacing.xs,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BFE5CB',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: ACTIVE_GREEN,
    fontWeight: '600',
    fontSize: 13,
  },
  cta: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: ACTIVE_GREEN,
    height: 50,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: {
    opacity: 0.5,
  },
  ctaText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.36)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.lg,
    maxHeight: '86%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray900,
    marginTop: Spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 46,
    marginTop: Spacing.sm,
    backgroundColor: Colors.gray50,
    color: Colors.gray900,
    fontSize: 13,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  halfInput: {
    flex: 1,
  },
  chips: {
    flexDirection: 'row',
    marginTop: Spacing.md,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginRight: Spacing.sm,
  },
  chipActive: {
    backgroundColor: ACTIVE_GREEN,
    borderColor: ACTIVE_GREEN,
  },
  chipText: {
    color: Colors.gray700,
    fontWeight: '600',
    fontSize: 12,
  },
  chipTextActive: {
    color: Colors.white,
  },
  save: {
    backgroundColor: ACTIVE_GREEN,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  saveText: {
    color: Colors.white,
    fontWeight: '700',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8F2',
  },
  loaderText: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    color: Colors.gray900,
    fontSize: 14,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  emptyText: {
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
  },
  keyboardView: {
    flex: 1,
  },
});
