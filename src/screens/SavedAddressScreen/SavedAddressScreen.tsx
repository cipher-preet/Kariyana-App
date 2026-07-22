import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
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
  useGetUserDileveryAddressQuery,
  useAddDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
} from '../../ReduxToolKit/Api/PaymentApi';
import { useSelector } from 'react-redux';
import { Colors, Radius, Shadows, Spacing } from '../../styles';
import AppAlert, {
  AppAlertState,
  createHiddenAlert,
} from '../../components/common/AppAlert';

const ACTIVE_GREEN = '#0B6B3A';

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

const EditIcon = ({ color = ACTIVE_GREEN }) => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 20h9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="m16.5 3.5 4 4L8 20H4v-4L16.5 3.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TrashIcon = ({ color = Colors.error }) => (
  <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
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

const AddressScreen = ({ navigation }: any) => {
  const user_Id = useSelector((state: any) => state.auth.userId);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alert, setAlert] = useState<AppAlertState>(createHiddenAlert());
  const { data, isLoading, refetch } = useGetUserDileveryAddressQuery({
    userId: user_Id,
  });

  const [addDeliveryAddress, { isLoading: adding }] =
    useAddDeliveryAddressMutation();
  const [updateDeliveryAddress, { isLoading: updating }] =
    useUpdateDeliveryAddressMutation();
  const [deleteDeliveryAddress, { isLoading: deleting }] =
    useDeleteDeliveryAddressMutation();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    house: '',
    area: '',
    city: '',
    pincode: '',
    type: 'Home',
  });

  useEffect(() => {
    if (data?.data) {
      const formatted = data.data.map((item: any) => ({
        id: item._id,
        label: item.type,
        name: item.name,
        phone: String(item.phone),
        house: item.houseVillage,
        area: item.areaStreet,
        city: item.city,
        pincode: item.pincode,
      }));

      setAddresses(formatted);
    }
  }, [data]);

  const resetForm = () => {
    setEditingId(null);
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

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setForm({
      name: item.name || '',
      phone: item.phone || '',
      house: item.house || '',
      area: item.area || '',
      city: item.city || '',
      pincode: String(item.pincode || ''),
      type: item.label || 'Home',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDeliveryAddress({ id }).unwrap();
      if (res) {
        setAlert({
          visible: true,
          title: 'Address deleted',
          message: res.data.message,
          variant: 'success',
        });
      }
      refetch();
    } catch (error) {
      console.log('Delete Address Error:', error);
      setAlert({
        visible: true,
        title: 'Delete failed',
        message: 'Please try again after a moment.',
        variant: 'error',
      });
    }
  };

  const closeSheet = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSave = async () => {
    if (!form.name || !form.phone || !form.house) {
      setAlert({
        visible: true,
        title: 'Missing address details',
        message: 'Please add name, phone number, and house details.',
        variant: 'warning',
      });
      return;
    }

    try {
      if (editingId) {
        const res = await updateDeliveryAddress({
          id: editingId,
          name: form.name,
          phone: form.phone,
          houseVillage: form.house,
          areaStreet: form.area,
          city: form.city,
          pincode: form.pincode,
          type: form.type,
        }).unwrap();
        if (res) {
          setAlert({
            visible: true,
            title: 'Address updated',
            message: res.data.message,
            variant: 'success',
          });
        }
      } else {
        const res = await addDeliveryAddress({
          userId: user_Id,
          name: form.name,
          phone: form.phone,
          houseVillage: form.house,
          areaStreet: form.area,
          city: form.city,
          pincode: form.pincode,
          type: form.type,
        }).unwrap();
        if (res) {
          setAlert({
            visible: true,
            title: 'Address saved',
            message: res.data.message,
            variant: 'success',
          });
        }
      }

      await refetch();
      closeSheet();
    } catch (error) {
      console.log('Save Address Error:', error);
      setAlert({
        visible: true,
        title: 'Save failed',
        message: 'Please check the details and try again.',
        variant: 'error',
      });
    }
  };

  return (
    <CartCheckoutWrapper
      title="Address"
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Saved Addresses</Text>

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={ACTIVE_GREEN} />
            <Text style={styles.loaderText}>Loading addresses</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {addresses.length === 0 ? (
              <View style={styles.emptyCard}>
                <LocationIcon color={Colors.gray500} />
                <Text style={styles.emptyTitle}>No saved address</Text>
                <Text style={styles.emptyText}>Add one for faster checkout.</Text>
              </View>
            ) : (
              addresses.map(item => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardRow}>
                    <View style={styles.iconCircle}>
                      <LocationIcon />
                    </View>

                    <View style={styles.cardCopy}>
                      <Text style={styles.cardTitle}>{item.label}</Text>
                      <Text style={styles.cardSub}>
                        {item.name} | {item.phone}
                      </Text>
                      <Text style={styles.cardAddress}>
                        {item.house}, {item.area}, {item.city} - {item.pincode}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => openEditModal(item)}
                      style={styles.actionButton}
                      activeOpacity={0.82}
                    >
                      <EditIcon />
                      <Text style={styles.edit}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      style={styles.actionButton}
                      activeOpacity={0.82}
                      disabled={deleting}
                    >
                      <TrashIcon />
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            <TouchableOpacity
              style={styles.addBtn}
              onPress={openAddModal}
              activeOpacity={0.84}
            >
              <PlusIcon />
              <Text style={styles.addText}>Add New Address</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <Modal visible={showModal} transparent animationType="slide">
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.overlay}>
              <View style={styles.sheet}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>
                    {editingId ? 'Edit Address' : 'Add Address'}
                  </Text>
                  <TouchableOpacity
                    onPress={closeSheet}
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
                      value={form.pincode}
                      onChangeText={(t: string) =>
                        setForm({ ...form, pincode: t })
                      }
                      keyboardType="number-pad"
                      maxLength={6}
                      style={styles.halfInput}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.save}
                    onPress={handleSave}
                    activeOpacity={0.86}
                    disabled={adding || updating}
                  >
                    {adding || updating ? (
                      <ActivityIndicator color={Colors.white} />
                    ) : (
                      <Text style={styles.saveText}>
                        {editingId ? 'Update Address' : 'Save Address'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <AppAlert
          {...alert}
          onClose={() => setAlert(createHiddenAlert())}
        />
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
    paddingBottom: 120,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.soft,
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  edit: {
    color: ACTIVE_GREEN,
    fontWeight: '600',
    fontSize: 12,
  },
  delete: {
    color: Colors.error,
    fontWeight: '600',
    fontSize: 12,
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
