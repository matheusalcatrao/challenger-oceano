import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  flatlist: {
    flex: 1,
    // backgroundColor: '#333',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 40,
  },
  modalContainer: {
    height: '60%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  input: {
    backgroundColor: '#fff',
    width: '60%',
    height: 30,
    marginTop: 40,
    marginBottom: 40,
  },
  footer: {
    width: '80%',
    height: '30%',
    justifyContent: 'space-around',
  },
})
