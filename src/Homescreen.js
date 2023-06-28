import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class FifteenDayCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      firstDate: null,
      showForwardArrow: true,
      selectedCard: null,
    };
  }

  componentDidMount() {
    this.calculateFirstDate();
  }

  calculateFirstDate() {
    const { currentDate } = this.state;
    const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.setState({ firstDate }, () => {
      this.renderCalendar();
    });
  }

  handleBackwardArrowPress = () => {
    const { firstDate } = this.state;
    const newDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() - 5);

    if (newDate.getMonth() === firstDate.getMonth()) {
      this.setState({ firstDate: newDate, showForwardArrow: true });
    }
  };

  handleForwardArrowPress = () => {
    const { firstDate } = this.state;
    const newDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 5);

    if (newDate.getMonth() === firstDate.getMonth()) {
      this.setState({ firstDate: newDate });

      if (newDate.getDate() >= 10) {
        this.setState({ showForwardArrow: false });
      } else {
        this.setState({ showForwardArrow: true });
      }
    }
  };

  handleCardPress = (index) => {
    this.setState({ selectedCard: index });
  };

  renderCalendar() {
    const { firstDate, selectedCard } = this.state;
    const calendarDays = [];

    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i);
      const date = currentDate.getDate();
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' }).split(',')[0];
      const month = currentDate.toLocaleDateString('en-US', { month: 'short' });

      const cardStyle = [styles.calendarDay];
      if (selectedCard === i) {
        cardStyle.push(styles.selectedCard);
      }

      calendarDays.push(
        <TouchableOpacity
          key={i}
          style={cardStyle}
          onPress={() => this.handleCardPress(i)}
        >
          <Text style={{ color: 'lightblue', fontSize: 18,fontWeight:'bold' }}>{month}</Text>
          <Text style={{ color: 'lightpink', fontSize: 20,fontWeight:'bold' }}>{date}</Text>
          <Text style={{ color: 'grey', fontSize: 18,fontWeight:'bold' }}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return calendarDays;
  }

  render() {
    const { firstDate, showForwardArrow } = this.state;

    if (firstDate === null) {
      return null;
    }

    const calendarDays = this.renderCalendar();
    const isFirstDate = firstDate.getDate() === 1;

    return (
      <View style={styles.container}>
        <View style={styles.calendarHeader}>
          {!isFirstDate && (
            <TouchableOpacity
              style={[styles.arrowButton, styles.leftArrowButton]}
              onPress={this.handleBackwardArrowPress}
            >
              <Text style={{fontSize:20,fontWeight:'bold'}}>{'<'}</Text>
            </TouchableOpacity>
          )}
          <View style={styles.calendarDaysContainer}>
            {calendarDays}
          </View>
          {showForwardArrow && (
            <TouchableOpacity
              style={[styles.arrowButton, styles.rightArrowButton]}
              onPress={this.handleForwardArrowPress}
            >
              <Text style={{fontSize:20,fontWeight:'bold'}}>{'>'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  arrowButton: {
    padding: 10,
    borderRadius:5
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#add8e6',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius:5
  },
  calendarDay: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 70,
    height: 90,
    marginBottom: 10,
    marginRight: 5,
    marginTop: 10,
    marginLeft: 3,
    borderWidth: 2,
    borderColor: 'F44336',
    backgroundColor: '#f5fffa',
  },
  leftArrowButton: {
    backgroundColor: '#e6e6fa',
    marginRight: 5,
    marginLeft: -20,
    borderWidth: 1,
    borderColor: 'F44336',
  },
  rightArrowButton: {
    backgroundColor: '#e6e6fa',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: 'F44336',
  },
  selectedCard: {
    backgroundColor: '#dcdcdc', 
  },
};

export default FifteenDayCalendar;
