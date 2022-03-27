import React, { useEffect } from 'react';
import Wraper from '../components/Wraper';
import c3 from 'c3';
import axios from 'axios';

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [['x'], ['Sales']],
          types: {
            Sales: 'bar',
          },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
            },
          },
        },
      });

      const { data } = await axios.get('chart');
      chart.load({
        columns: [
          ['x', ...data.map((r: any) => r.date)],
          ['Sales', ...data.map((r: any) => r.sum)],
        ],
      });
    })();
  }, []);

  return (
    <Wraper>
      <h2>Daily Sales</h2>
      <div id="chart"></div>
    </Wraper>
  );
};

export default Dashboard;
