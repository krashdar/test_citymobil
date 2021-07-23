import React from 'react';

class Result extends React.Component {
    render() {
        if (this.props.resultItem !== '') {
            return (
                <div className={"resultItem"}>
                    <span className={"text"}>
                        Выбран автомобиль {this.props.resultItem}, {this.props.resultYear} года выпуска
                    </span>
                </div>
            );
        } else return (
            <div className={"resultItem"}>
                <span className={"text"}>
                    Автомобиль не выбран
                </span>
            </div>
        )
    }
}

export default Result;