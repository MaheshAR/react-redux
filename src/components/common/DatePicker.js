import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as _ from 'lodash';

class Datepicker extends React.Component{
    constructor(props){
        super(props);

        this.dateRange = this.getMinMaxDate(this.props.expenseId);

        this.state = {
            startDate: null,
            minDate: this.dateRange.minDate,
            maxDate: this.dateRange.maxDate
        };
    }

    handleChange(date){
        this.setState({
            startDate: date
        });

        this.props.setDate(date);
    }

    getMinMaxDate(expenseId){
        const year = parseInt(expenseId.toString().substring(0,4));
        const month = parseInt(expenseId.toString().substring(4, expenseId.toString().length));
        const noOfDays = new Date(year, month, 0).getDate();
        let currentDate = moment();
        const yearDiff = year - currentDate.year();
        const monthDiff = month - currentDate.month();
        const dayDiff = currentDate.date() - 1;

        currentDate = currentDate.add(yearDiff, "years");
        currentDate = currentDate.add(monthDiff - 1, "months");

        return {
            minDate: _.cloneDeep(currentDate.add(-dayDiff, "days")),
            maxDate: _.cloneDeep(currentDate.add(noOfDays - 1, "days"))
        }
    }

    render(){
        return(
            <DatePicker forceShowMonthNavigation={false} 
                        minDate={this.state.minDate} 
                        maxDate={this.state.maxDate} 
                        selected={this.state.startDate} 
                        onChange={this.handleChange.bind(this)} />
        );
    }
}

export default Datepicker;