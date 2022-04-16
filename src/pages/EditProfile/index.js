import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { getData, storeData } from '../../utils/localStorage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-date-picker';

export default function EditProfile({ navigation, route }) {
  navigation.setOptions({
    title: 'Edit Profile',
  });

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

  const options = {
    includeBase64: true,
    quality: 0.3,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = { uri: response.uri };
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto_user: `data:${response.type};base64, ${response.base64}`,
            });
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('All Response = ', response);

      console.log('Ukuran = ', response.fileSize);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        if (response.fileSize <= 200000) {
          let source = { uri: response.uri };
          switch (xyz) {
            case 1:
              setData({
                ...data,
                foto_user: `data:${response.type};base64, ${response.base64}`,
              });
              break;
          }
        } else {
          showMessage({
            message: 'Ukuran Foto Terlalu Besar Max 500 KB',
            type: 'danger',
          });
        }
      }
    });
  };

  const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Image
          source={{
            uri: data.foto_user,
          }}
          style={{
            width: '100%',
            aspectRatio: 2,
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <MyButton
              onPress={onPress1}
              colorText={colors.white}
              title="KAMERA"
              warna={colors.primary}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              onPress={onPress2}
              title="GALLERY"
              colorText={colors.white}
              warna={colors.secondary}
            />
          </View>
        </View>
      </View>
    );
  };



  useEffect(() => {
    getData('user').then(res => {
      setData(res);
      console.error('data user', res);
    });
    console.log('test edit');
  }, []);

  const simpan = () => {
    setLoading(true);
    console.log('kirim edit', data);
    axios.post('https://mysukha.zavalabs.com/api/profile.php', data).then(res => {
      console.log(res);
      storeData('user', res.data);
      setLoading(false);
      showMessage({
        type: 'success',
        message: 'Data bershasil diupdate..',
      });

      navigation.replace('MainApp');

      // console.log(err[0]);
    });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={styles.page}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              // alignItems: 'flex-end',
              padding: 10,
            }}>
            <MyButton
              warna={colors.primary}
              title="Simpan Perubahan"
              Icons="log-in"
              onPress={simpan}
            />
          </View>
        </View>
        <MyGap jarak={5} />

        <UploadFoto
          onPress1={() => getCamera(1)}
          onPress2={() => getGallery(1)}
          label="Upload Foto Profile"
          foto={foto}
        />
        <MyGap jarak={10} />
        <MyInput
          label="NIP"
          iconname="card-outline"
          value={data.nip}
          onChangeText={value =>
            setData({
              ...data,
              nip: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Password"
          placeholder="Kosongkan jika tidak diubah"
          iconname="key-outline"
          secureTextEntry
          value={data.newpassword}
          onChangeText={value =>
            setData({
              ...data,
              newpassword: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Nama Lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="E - mail"
          iconname="mail-outline"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Telepon"
          iconname="call-outline"
          keyboardType="number-pad"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />


        <MyGap jarak={10} />
        <MyInput
          label="Alamat"
          iconname="map-outline"
          multiline={true}
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Divisi"
          iconname="school-outline"
          value={data.divisi}
          onChangeText={value =>
            setData({
              ...data,
              divisi: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Jabatan"
          iconname="albums-outline"
          value={data.jabatan}
          onChangeText={value =>
            setData({
              ...data,
              jabatan: value,
            })
          }
        />


        <MyPicker label="Jenis Kelamin" iconname="apps-outline" data={
          [
            {
              'label': 'Laki-laki',
              'value': 'Laki-laki'
            },
            {
              'label': 'Perempuan',
              'value': 'Perempuan'
            }
          ]
        } onValueChange={val => setData({ ...data, jenis_kelamin: val })} />


        <MyGap jarak={10} /><MyInput label='Tempat Lahir' iconname='albums-outline' value={data.tempat_lahir} onChangeText={value => setData({ ...data, tempat_lahir: value, })} />

        <Text style={{
          marginVertical: 5,
          fontFamily: fonts.secondary[600],
          color: colors.primary,
          fontSize: windowWidth / 25,
        }}>Tanggal Lahir</Text>
        <DatePicker title="Tanggal Lahir" mode="date" date={data.tanggal_lahir == null ? new Date() : new Date(data.tanggal_lahir)} onDateChange={val => setData({
          ...data,
          tanggal_lahir: val
        })} />
        <MyGap jarak={10} /><MyInput label='Agama' iconname='albums-outline' value={data.agama} onChangeText={value => setData({ ...data, agama: value, })} />
        <MyGap jarak={10} /><MyInput label='Suku' iconname='albums-outline' value={data.suku} onChangeText={value => setData({ ...data, suku: value, })} />
        <MyGap jarak={10} /><MyInput label='Kewarganegaraan' iconname='albums-outline' value={data.kewarganegaraan} onChangeText={value => setData({ ...data, kewarganegaraan: value, })} />
        <MyGap jarak={10} /><MyInput label='Status' iconname='albums-outline' value={data.status} onChangeText={value => setData({ ...data, status: value, })} />
        <MyGap jarak={10} /><MyInput label='Golongan Darah' iconname='albums-outline' value={data.golongan_darah} onChangeText={value => setData({ ...data, golongan_darah: value, })} />
        <MyGap jarak={10} /><MyInput label='No. KTP' iconname='albums-outline' value={data.ktp} onChangeText={value => setData({ ...data, ktp: value, })} />
        <MyGap jarak={10} /><MyInput label='NPWP' iconname='albums-outline' value={data.npwp} onChangeText={value => setData({ ...data, npwp: value, })} />
        <MyGap jarak={10} /><MyInput label='SIM A' iconname='albums-outline' value={data.sim_a} onChangeText={value => setData({ ...data, sim_a: value, })} />
        <MyGap jarak={10} /><MyInput label='SIM C' iconname='albums-outline' value={data.sim_c} onChangeText={value => setData({ ...data, sim_c: value, })} />
        <MyGap jarak={10} /><MyInput label='SD' iconname='albums-outline' value={data.sd} onChangeText={value => setData({ ...data, sd: value, })} />
        <MyGap jarak={10} /><MyInput label='SMP' iconname='albums-outline' value={data.smp} onChangeText={value => setData({ ...data, smp: value, })} />
        <MyGap jarak={10} /><MyInput label='SMA' iconname='albums-outline' value={data.sma} onChangeText={value => setData({ ...data, sma: value, })} />
        <MyGap jarak={10} /><MyInput label='D1' iconname='albums-outline' value={data.d1} onChangeText={value => setData({ ...data, d1: value, })} />
        <MyGap jarak={10} /><MyInput label='D3' iconname='albums-outline' value={data.d3} onChangeText={value => setData({ ...data, d3: value, })} />
        <MyGap jarak={10} /><MyInput label='S1' iconname='albums-outline' value={data.s1} onChangeText={value => setData({ ...data, s1: value, })} />
        <MyGap jarak={10} /><MyInput label='S2' iconname='albums-outline' value={data.s2} onChangeText={value => setData({ ...data, s2: value, })} />
        <MyGap jarak={10} /><MyInput label='Kursus' iconname='albums-outline' value={data.kursus} onChangeText={value => setData({ ...data, kursus: value, })} />
        <MyGap jarak={10} /><MyInput label='Instagram' iconname='albums-outline' value={data.instagram} onChangeText={value => setData({ ...data, instagram: value, })} />
        <MyGap jarak={10} /><MyInput label='Facebook' iconname='albums-outline' value={data.facebook} onChangeText={value => setData({ ...data, facebook: value, })} />
        <MyGap jarak={10} /><MyInput label='Twitter' iconname='albums-outline' value={data.twitter} onChangeText={value => setData({ ...data, twitter: value, })} />
        <MyGap jarak={10} /><MyInput label='Linkedin' iconname='albums-outline' value={data.linkedin} onChangeText={value => setData({ ...data, linkedin: value, })} />
        <MyGap jarak={10} /><MyInput label='Hobi' iconname='albums-outline' value={data.hobi} onChangeText={value => setData({ ...data, hobi: value, })} />


        <MyGap jarak={20} />
      </ScrollView>

      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
