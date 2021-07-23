import React from 'react';


class TableHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.valueOfSort;
        this.setValueOfSort = this.setValueOfSort.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.setValueOfSort();
        }
    }

    setValueOfSort() {
        this.props.onSetValueOfSort(this.state);
    }

    render() {
        const row = [<th className={"names"} key={"names"} onClick={() => {
            this.setState(prevState => ({
                valueOfSort: 0,
                fromUpToDown: !prevState.fromUpToDown
            }));
        }}>
            Марка и модель
        </th>];
        this.props.tariffs.forEach((tariff, index) => {
            row.push(
                <th className={tariff} key={tariff} onClick={() => {
                    this.setState(prevState => ({
                        valueOfSort: index + 1,
                        fromUpToDown: !prevState.fromUpToDown
                    }));
                    this.setValueOfSort();
                }}>{tariff}</th>
            );
        });

        return (
            <thead className={"menu"}>
            <tr>{row}</tr>
            </thead>
        )
    }
}

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.setResultItem = this.setResultItem.bind(this);
    }

    setResultItem(resultItem, resultYear) {
        this.props.onSetResultItem(resultItem, resultYear);
    }

    Sort(rows, valueOfSort, fromUpToDown) {
        let presortedRows = this.preSort(rows, valueOfSort);
        if (fromUpToDown) {
            presortedRows.sort((rowA, rowB) => rowA.props.children[valueOfSort].props.children > rowB.props.children[valueOfSort].props.children ? 1 : -1);
        } else {
            presortedRows.sort((rowA, rowB) => rowA.props.children[valueOfSort].props.children > rowB.props.children[valueOfSort].props.children ? -1 : 1);
        }
    }

    preSort(rows, valueOfSort) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].props.children[valueOfSort].props.children.toString() === " - ") {
                rows.splice(i, 1);
                i--;
            }
        }
        return rows;
    }

    render() {
        const filterText = this.props.filterText;
        const rows = [];
        this.props.cars.forEach((car) => {
            if (car.mark.indexOf(filterText) &&
                car.model.indexOf(filterText) === -1) {
                return;
            }
            const row = [];
            row.push(<td key={car.mark + " " + car.model}>
                {car.mark + " " + car.model}
            </td>);
            this.props.tariffs.forEach((tariff) => {
                let cellText = new Map();
                for (const key in car.tariffs) {
                    if (tariff === key) {
                        cellText.set("year", car.tariffs[key].year);
                        cellText.set("car", car.mark + " " + car.model);
                    }
                }
                if (cellText.size !== 0) {
                    row.push(<td key={tariff}
                                 className={"cellWithValue"}
                                 onClick={((e) => {
                                     e.preventDefault();
                                     this.setResultItem(cellText.get("car"), cellText.get("year"));
                                 })}>
                        {cellText.get("year")}
                    </td>)
                } else row.push(
                    <td key={tariff}> - </td>
                );

            });
            rows.push(<tr>{row}</tr>);
        });
        if (this.props.valueOfSort) {
            this.Sort(rows, this.props.valueOfSort.valueOfSort, this.props.valueOfSort.fromUpToDown);
        }
        return rows;
    }
}


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueOfSort: {
                valueOfSort: 0,
                fromUpToDown: true
            }
        }

        this.setValueOfSort = this.setValueOfSort.bind(this)
    }

    setValueOfSort(valueOfSort) {
        this.setState({valueOfSort: valueOfSort});
    }

    render() {
        return (
            <div className={"table"}>
                <table id={"table"}>
                    <TableHead tariffs={this.props.tariffs}
                               valueOfSort={this.state.valueOfSort}
                               onSetValueOfSort={this.setValueOfSort}
                    />
                    <TableBody
                        filterText={this.props.filterText}
                        cars={this.props.cars}
                        tariffs={this.props.tariffs}
                        onSetResultItem={this.props.onSetResultItem}
                        valueOfSort={this.state.valueOfSort}
                    />
                </table>
            </div>
        );
    }
}

export default Table;