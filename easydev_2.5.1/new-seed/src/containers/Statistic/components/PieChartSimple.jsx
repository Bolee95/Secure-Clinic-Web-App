/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import Panel from './../../../shared/components/Panel';

import getTooltipStyles from './../../../shared/components/helpers';

const style = (dir) => {
  const left = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return ({
    ...left,
    width: 150,
    lineHeight: '30px',
    position: 'absolute',
  });
};


const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {
        payload.map((entry, index) => (
          <li key={`item-${index}`}><span style={{ backgroundColor: entry.color }} />{entry.value}</li>
        ))
      }
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    vslue: PropTypes.string,
  })).isRequired,
};

class PieChartSimple extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    dir: PropTypes.string.isRequired,
    themeName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  onMouseMove = (e) => {
    const { dir } = this.props;
    if (e.tooltipPosition) {
      this.setState({ x: dir === 'ltr' ? e.tooltipPosition.x : e.tooltipPosition.x / 10, y: e.tooltipPosition.y });
    }
  };

  render() {
    const { dir, themeName, data } = this.props;
    const { x, y } = this.state;

    return (
      <Panel
        lg={1}
        xl={12}
        md={1}
        title={"Number of pacients by waiting list"}
        subhead="Total number of pacients for waiting lists for current hospital"
      >
        <div dir={dir}>
          <ResponsiveContainer className="dashboard__chart-pie dashboard__chart-pie--crypto" height={410}>
            <PieChart className="dashboard__chart-pie-container">
              <Tooltip
                formatter={value => (`${value}`)}
                position={{ x, y }}
                {...getTooltipStyles(themeName)}
              />
              <Pie
                data={data}
                dataKey="count"
                cy={200}
                innerRadius={120}
                outerRadius={160}
                fontSize="24px"
                label={value => (`${value.value}`)}
                onMouseMove={this.onMouseMove}
              />
              <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style(dir)} content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    );
  }
}

export default connect(state => ({ themeName: state.theme.className }))(PieChartSimple);
