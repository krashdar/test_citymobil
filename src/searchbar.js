import React from 'react';

class ButtonFind extends React.Component {
    render() {
        return (
            <button onClick={(event => event.preventDefault())}>
                Найти
            </button>
        );
    }
}

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        // const filterText = this.props.filterText;

        return (
            <form className={"searchbar"}>
                <div className={"search"}>
                    <svg className={"search__icon"} width="16" height="16" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.58388 3.36469C11.268 5.04878 11.268 7.77924 9.58388 9.46333C7.89978 11.1474 5.16933 11.1474 3.48524 9.46333C1.80114 7.77924 1.80114 5.04878 3.48524 3.36469C5.16933 1.6806 7.89978 1.6806 9.58388 3.36469"
                            stroke="#7B8395" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.55273 9.48819L13.7777 13.771" stroke="#7B8395" stroke-width="1.625"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={this.props.filterText}
                        onChange={this.handleFilterTextChange}
                    />
                </div>
                <ButtonFind/>
            </form>
        );
    }
}

export default Searchbar;