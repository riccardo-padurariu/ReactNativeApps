import { DataContext } from '@/app/DataContext';
import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, onValue, push, ref } from 'firebase/database';
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddHomework = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {

  const [showDate,setShowDate] = React.useState(false);
  const [title,setTitle] = React.useState('');
  const [description,setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [showHour,setShowHour] = React.useState(false);
  const [hour,setHour] = React.useState(new Date());
  const [className,setClassName] = React.useState();
  const [classList,setClassList] = React.useState([]);

  const { teachersList } = useContext(DataContext);
  const { currentUser } = useAuth();

  React.useEffect(() => {
      if(!currentUser) return;
  
      const db = getDatabase(app);
      const classesRef = ref(db,`students`);
      
      const unsubscribe = onValue(classesRef, (snapshot) => {
        
        if(snapshot.exists()){
          const classData = snapshot.val();
          const arr = Object.keys(classData);
          setClassList(arr);
        }else{
          setClassList([]);
        }
  
      }, (error: any) => {
        console.log('Error fetching classes: ',error);
      })
  
      return () => unsubscribe();
  
    },[currentUser]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDate(false);
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
  }

  const onChangeHour = (event: any, selectedDate?: Date) => {
    setShowHour(false);
    if (event.type === "set" && selectedDate) {
      setHour(selectedDate);
    }
  }

  const addHmTeacher = async() => {

    let firebaseId;
    teachersList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
    });

    const db = getDatabase(app);
    const teacherRef = ref(db,`teachers/${firebaseId}/homeworks`);
    const tokens = currentUser.displayName.split('_');
    const current_date = new Date();
    const data = {
      name: tokens[3],
      discipline: tokens[4],
      description: description,
      title: title,
      dueTime: {
        hour: hour.getHours(),
        minutes: hour.getMinutes()
      },
      dueDate: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      },
      time: {
        hour: current_date.getHours(),
        minutes: current_date.getMinutes()
      },
      date: {
        day: current_date.getDate(),
        month: current_date.getMonth() + 1,
        year: current_date.getFullYear()
      },
      className: className
    };

    await push(teacherRef,data);
  }

  const addHmStudent = async() => {

    const db = getDatabase(app);
    const teacherRef = ref(db,`students/${className}/homeworks`);
    const tokens = currentUser.displayName.split('_');
    const current_date = new Date();
    const data = {
      name: tokens[3],
      discipline: tokens[4],
      description: description,
      title: title,
      dueTime: {
        hour: hour.getHours(),
        minutes: hour.getMinutes()
      },
      dueDate: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      },
      time: {
        hour: current_date.getHours(),
        minutes: current_date.getMinutes()
      },
      date: {
        day: current_date.getDate(),
        month: current_date.getMonth() + 1,
        year: current_date.getFullYear()
      },
      className: className
    };

    await push(teacherRef,data);
  }

  const addHomework = () => {
    addHmTeacher().then(() => addHmStudent());
    setCondition(false);
  }

  return (
    <Modal
      animationType="slide"
      visible={condition}
      transparent={true}
    >
      <View style={styles.cover}></View>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Add homework</Text>
            <TouchableOpacity
              onPress={() => setCondition(false)}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View> 
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add title: </Text>
            <TextInput style={styles.input} value={title} onChangeText={(text: string) => setTitle(text)} placeholder='Add title'/>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add description: </Text>
            <TextInput style={styles.input} multiline={true} value={description} onChangeText={(text: string) => setDescription(text)} placeholder='Add description'/>
          </View>
          <Text style={{fontSize: 15}}>Select the class</Text>
          <Picker
            selectedValue={className}
            onValueChange={(itemValue) => setClassName(itemValue)}
            style={{ height: 50, width: 135,marginLeft: -15 }}
          >
            {classList && classList.map((item: string) => 
              <Picker.Item style={{fontSize: 15}} label={item} value={item}/>
            )}
          </Picker>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              style={{marginBottom: 5}}
            >
              {showDate ? 
                <DateTimePicker 
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              : <Text style={styles.label}>
                Select due date
              </Text>}
            </TouchableOpacity>
            <Text style={{fontSize: 15}}>Date selected: {date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : ''}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => setShowHour(true)}
              style={{marginBottom: 5}}
            >
              {showHour ? 
                <DateTimePicker 
                  value={hour}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeHour}
                />
              : <Text style={styles.label}>
                Select due hour
              </Text>}
            </TouchableOpacity>
            <Text style={{fontSize: 15}}>Hour selected: {hour ? `${hour.getHours()}:${hour.getMinutes()}` : ''}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={addHomework}
          >
            <Text style={styles.addButtonText}>Add homework</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.52,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,alignItems: 'center',justifyContent: 'center'
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '87%',
    height: '60%',
    borderRadius: 15
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 15
  },
  input: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#867CF1',
    maxHeight: 40,
    justifyContent: 'center',
    borderRadius: 10
  },
  addButtonText: {
    color: 'white',
    fontSize: 15
  }
});

export default AddHomework;