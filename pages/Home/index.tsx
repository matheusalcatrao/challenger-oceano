import React from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native'
import * as FileSystem from 'expo-file-system'
import { format, parse } from 'date-fns'
import * as DocumentPicker from 'expo-document-picker'
import { styles } from './styles'
import { DriverType } from './types'

const Home = () => {
  const [driver, setDriver] = React.useState<Array<DriverType>>()
  const [driverSelect, setDriverSelect] = React.useState<DriverType>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState<string>()
  const [driverIndex, setDriverIndex] = React.useState<number>()

  const readFile = async () => {
    const response: any = await DocumentPicker.getDocumentAsync()
    const fileUri = await FileSystem.readAsStringAsync(response.uri)
    const lines = fileUri.split(/\r?\n/).filter((line) => line !== '')
    const keyNames = ['hour', 'name', 'lap', 'timeReturn', 'speed']

    const allDrives: any = lines.map((item) => {
      const line = item.split(' ')
      let driverInfo = {}
      line.forEach((element, index) => {
        driverInfo = {
          ...driverInfo,
          [keyNames[index]]: element,
        }
      })
      return driverInfo
    })

    startRace(allDrives)
  }

  const startRace = (drivesInfo: Array<DriverType>) => {
    // start loading

    let timeFinished = new Date()
    const finishRace = drivesInfo.map((driver) => {
      const driverLap = Number(driver.lap)
      if (driverLap < 4) {
        for (let i = 0; i < driverLap; i++) {
          const timeReturnParsed = parse(
            String(driver.timeReturn),
            'HH:mm.SSS',
            new Date()
          )
          timeFinished = new Date(
            Number(timeReturnParsed) + Number(timeReturnParsed)
          )
        }
      }

      return { ...driver, timeFinished, lap: 4 }
    })
    const sortDrivers: any = finishRace
      .sort((a: any, b: any) => a.timeFinished - b.timeFinished)
      .map((driver) => {
        return {
          ...driver,
          timeFinished: format(driver.timeFinished, 'H:mm.SSS'),
        }
      })

    setDriver(sortDrivers)
  }

  const handleUpdateDriver = (index: number) => {
    setDriverSelect(driver[index])
    setDriverIndex(index)
    setShowModal(true)
  }

  const saveDriver = () => {
    let updateDriver = driver.map((driver, index) => {
      if (index === driverIndex) {
        return { ...driver, name: inputValue }
      }
      return { ...driver }
    })
    setDriver(updateDriver)
    setInputValue('')
    setShowModal(false)
  }

  return (
    <View style={styles.container}>
      {driver ? (
        <>
          <Text style={styles.title}>Colocados</Text>
          <FlatList
            data={driver}
            style={styles.flatlist}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleUpdateDriver(index)}>
                <Text style={styles.label}>
                  {`# ${index + 1} | ${item.name} | ${item.timeFinished} | ${
                    item.lap
                  }`}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>
            Carregue o arquivo .txt com as informações dos pilotos
          </Text>
          <Button title="ler arquivo" onPress={() => readFile()} />
        </>
      )}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Editar Piloto</Text>
          <TextInput
            style={styles.input}
            placeholder={driverSelect?.name}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <View style={styles.footer}>
            <Button color="green" title="Save" onPress={() => saveDriver()} />
            <Button
              color="red"
              title="Cancelar"
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Home
