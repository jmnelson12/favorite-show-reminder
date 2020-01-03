import * as React from 'react';

type Props = {
    callback: Function
};

const Search: React.FunctionComponent<Props> = ({ callback }) => {
    const [value, setValue] = React.useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        callback(value);
    }

    return (
        <div className="searchWrapper">
            <form autoComplete={"off"} onSubmit={handleSubmit}>
                <label htmlFor="txtSearch">Search: </label>
                <input
                    type="search"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    name="search"
                    id="search"
                    autoComplete={"off"}
                />
                <input type="submit" value="Search" />
            </form>
        </div>
    );
};

export default Search;