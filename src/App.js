import React from 'react';
import Searchbar from "./searchbar";
import Table from "./table";
import Result from "./result";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            resultItem: '',
            resultYear: ''
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.setResultItem = this.setResultItem.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    setResultItem(resultItem, resultYear) {
        this.setState({
            resultItem: resultItem,
            resultYear: resultYear
        });
    }

    render() {
        return (
            <div className={"App"}>
                <Searchbar filterText={this.state.filterText}
                           onFilterTextChange={this.handleFilterTextChange}
                />
                <Table
                    filterText={this.state.filterText}
                    resultitem={this.state.resultItem}
                    resultYear={this.state.resultYear}
                    cars={this.props.cars}
                    tariffs={this.props.tariffs}
                    onFilterTextChange={this.handleFilterTextChange}
                    onSetResultItem={this.setResultItem}
                />
                <Result resultItem={this.state.resultItem}
                        resultYear={this.state.resultYear}
                        onSetResultItem={this.setResultItem}
                />
            </div>
        );
    }
}

export default App;