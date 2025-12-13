// src/components/SaleCard.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
} from '../../styles';

import type { Product } from '../../types';

const YELLOW_BG = '#FDE9A5'; // keep same

type Props = {
  item: Product;
  onAdd?: (id: string, qty: number) => void;
};

const SaleCard: React.FC<Props> = ({ item, onAdd }) => {
  const [qty, setQty] = useState(0);

  const increase = () => {
    const newQty = qty + 1;
    setQty(newQty);
    onAdd?.(item.id, newQty);
  };

  const decrease = () => {
    if (qty <= 1) {
      setQty(0);
      return;
    }
    setQty(qty - 1);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />

        {item.saving && (
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>{item.saving}</Text>
          </View>
        )}

        {qty === 0 ? (
          <TouchableOpacity style={styles.addBtn} onPress={increase}>
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.stepper}>
            <TouchableOpacity onPress={decrease} style={styles.stepBtn}>
              <Text style={styles.stepTxt}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyTxt}>{qty}</Text>

            <TouchableOpacity onPress={increase} style={styles.stepBtn}>
              <Text style={styles.stepTxt}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.labelRow}>
        {item.labels?.map(l => (
          <View key={l} style={styles.label}>
            <Text style={styles.labelTxt}>{l}</Text>
          </View>
        ))}
      </View>

      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>

      <View style={styles.rateRow}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {item.stockText && (
        <Text style={styles.stock}>{item.stockText}</Text>
      )}

      <View style={styles.priceRowBg}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.mrp}>₹{item.mrp}</Text>
        </View>
      </View>

      {item.unitPrice && (
        <Text style={styles.unitPrice}>{item.unitPrice}</Text>
      )}
    </View>
  );
};

export default SaleCard;


const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: Spacing.lg,          
  },

  /* IMAGE */
  imageBox: {
    height: 130,
    borderRadius: Radius.md,           
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: Spacing.sm,         
    backgroundColor: YELLOW_BG,
  },

  image: {
    width: '80%',
    height: '80%',
  },

  saveBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.xs,     
    paddingVertical: Spacing.xxs,      
    borderRadius: Radius.xs,           
  },

  saveText: {
    color: Colors.white,
    fontSize: 10.5,
    fontWeight: '700',
  },


  addBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    minWidth: 70,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.success,
    borderRadius: Radius.sm,           
    paddingVertical: Spacing.xs,       
    paddingHorizontal: Spacing.sm,    
    elevation: 3,
  },

  addText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    color: Colors.success,
  },

  stepper: {
    position: 'absolute',
    bottom: -12,
    right: -10,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.success,
    borderRadius: Radius.lg,           
    paddingVertical: Spacing.xxs,      
    paddingHorizontal: Spacing.sm,     
    elevation: 3,
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'space-between',
  },

  stepBtn: {
    width: 28,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepTxt: {
    color: Colors.success,
    fontSize: 17,
    fontWeight: '900',
  },

  qtyTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray900,
    paddingHorizontal: Spacing.xs,     
  },

  labelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,                   
    marginTop: Spacing.sm,             
  },

  label: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xs,     
    paddingVertical: Spacing.xxs,      
    borderRadius: Radius.xs,           
    borderWidth: 0.5,
    borderColor: Colors.gray300,
  },

  labelTxt: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray800,
  },

  title: {
    marginTop: Spacing.sm,             
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.gray900,
    lineHeight: 17,
  },

  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,             
  },

  rating: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },

  time: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.gray700,
  },

  stock: {
    marginTop: Spacing.sm,             
    fontSize: 11,
    fontWeight: '700',
    color: Colors.warning,
  },

  priceRowBg: {
    marginTop: Spacing.sm,             
    backgroundColor: YELLOW_BG,
    paddingVertical: Spacing.xs,      
    paddingHorizontal: Spacing.xs,     
    borderRadius: Radius.sm,           
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,                  
  },

  price: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.gray900,
  },

  mrp: {
    fontSize: 11.5,
    color: Colors.gray600,
    textDecorationLine: 'line-through',
  },

  unitPrice: {
    marginTop: Spacing.xxs,           
    fontSize: 10.5,
    color: Colors.gray700,
  },
});
