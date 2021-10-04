import React, {useState} from 'react';
import Filter from './Filter';
import Grid from './Grid';
import Item from './Item';
import {DataItem, MOCK_DATA} from '../data/mock-data';

function App() {
    // Data that will be showed after the filtering was applied
    const [filteredData, setFilteredData] = useState<Array<DataItem>>(MOCK_DATA);

    function handleOnChange(newValue: string) {
        const processedQuery = newValue.toLowerCase();

        // Apply the filter on each element of the array
        setFilteredData(MOCK_DATA.filter((item) => {
            return item.title.toLowerCase().includes(processedQuery) ||
                    item.description.toLowerCase().includes(processedQuery);
        }));
    }

    return (
        <div className="app container">
            <Filter
                onFilterChange={handleOnChange}
            />
            <Grid pageSize={4}>
                {filteredData.map((item, i) => {
                    return (
                        <Item
                            key={i}
                            title={item.title}
                            description={item.description}
                            imagePath={item.imagePath}
                        />
                    )
                })}
            </Grid>
        </div>
    );
}

export default App;