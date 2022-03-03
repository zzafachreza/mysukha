import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import axios from 'axios';
import {fonts, windowWidth} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

export default function ListDetail({navigation, route}) {
  const item = route.params;
  navigation.setOptions({title: item.kode});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post('https://zavalabs.com/sigadisbekasi/api/transaksi_detail.php', {
        kode: item.kode,
      })
      .then(res => {
        console.log('detail transaksi', res.data);
        setData(res.data);
      });
  }, []);

  const DataPesanan = () => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          marginTop: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.secondary,
            padding: 10,
            color: colors.white,
          }}>
          {item.status}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.primary,
            padding: 10,
            color: colors.white,
          }}>
          {item.kode} - {item.tanggal}
        </Text>
        {/* --- */}
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, padding: 10}}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Nama
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.nama_pemesan}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{flex: 1, padding: 10}}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              No Hp
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.telepon_pemesan}
            </Text>
          </View>
        </View>
        {/* ---- */}
        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{flex: 1, padding: 10}}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Alamat
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.alamat_pemesan}
            </Text>
          </View>
        </View>
        {/* ---- */}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{padding: 10, flex: 1}}>
        <DataPesanan />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: '#DEDEDE',
            padding: 10,
            color: colors.black,
          }}>
          DETAIL
        </Text>
        <ScrollView>
          {data.map(item => {
            return (
              <View
                style={{
                  padding: 10,
                  // borderWidth: 1,
                  elevation: 1,
                  marginVertical: 2,
                  // borderColor: colors.primary,
                  backgroundColor: colors.white,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{padding: 5}}>
                    <Image
                      resizeMode="contain"
                      source={{uri: item.foto}}
                      style={{width: 100, aspectRatio: 2}}
                    />
                  </View>
                  <View style={{padding: 5, flex: 1}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                      }}>
                      {item.nama_barang}
                    </Text>

                    {/* <View style={{justifyContent: 'flex-end', flex: 1}}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          fontSize: windowWidth / 22,
                          color: colors.warning,
                        }}>
                        {item.total}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 20,
          backgroundColor: colors.white,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.warning,
          }}>
          Rp. {item.total}
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
