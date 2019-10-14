import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gamePrompt: 'Fire!',
      userChoice: CHOICES[0],
      compChoice: CHOICES[0],
      result: "Start!",
      color: 'blue',
    }
  }
  onPress = userChoice => {
    let indexOfUserChoice = 0;
    let indexOfCompChoice = Math.round(Math.random() * (2-0));
    for (i=0;i<3;i+=1){
      if(CHOICES[i].name===userChoice){
        indexOfUserChoice = i;
        break;
      }
    }
    // let resultOfGame = this.getRoundOutcome();
    this.setState({userChoice:CHOICES[indexOfUserChoice],compChoice:CHOICES[indexOfCompChoice]},()=>{
      let result = this.getRoundOutcome();
      let color;
      if (result==='Victory!') color = 'green';
      else if ( result==='Defeat!') color = 'red';
      else color = 'black';
      this.setState({result:result,color:color});
    })
  }
  getRoundOutcome = () => {
    // const computerChoice = randomComputerChoice().name;
    let result;
    let color;
    if (this.state.userChoice.name === 'rock') {
      result = this.state.compChoice.name === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (this.state.userChoice.name === 'paper') {
      result = this.state.compChoice.name === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (this.state.userChoice.name === 'scissors') {
      result = this.state.compChoice.name === 'paper' ? 'Victory!' : 'Defeat!';
    }
  
    if (this.state.userChoice.name === this.state.compChoice.name)
    { result = 'Tie game!';}
    // this.setState({result:result});
    // console.log(result)
    return result;
  };
  render() {
     return (
       <View style={styles.container}>
        <Text style={{fontSize: 20,color: this.state.color}}>{this.state.result}</Text>
        <View style={styles.choicesContainer}>
          <ChoiceDescription player="You" choice = {this.state.userChoice}/>
          <ChoiceDescription player="Comp" choice = {this.state.compChoice}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button name="rock" onPress={this.onPress}/>
          <Button name="paper" onPress={this.onPress}/>
          <Button name="scissors" onPress={this.onPress}/>
        </View>
        
       </View>
     )
  }
}

let ChoiceDescription = ({player,choice:{name,uri}}) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);
  // console.log(uri);
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{
                uri: uri,
                method: 'POST',
                headers: {
                  Pragma: 'no-cache',
                },
                body: 'Your Body goes here',
              }}
            style={styles.choiceImage}/>
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
    
}

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});