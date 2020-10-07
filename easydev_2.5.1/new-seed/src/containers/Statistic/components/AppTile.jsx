/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import Panel from '../../../shared/components/Panel';

import getTooltipStyles from '../../../shared/components/helpers';

const AppTileClicks = ({ dir, themeName, data, hoursUpdated }) => (
  <Panel
    lg={1}
    xl={12}
    md={1}
    title={"Check difference in key stats with latest updated statistics updated last time " + hoursUpdated + " hour ago"}
    subhead="Difference is presented between latest update and update before it"
    panelClass="panel--narrow"
  >
    <div dir="ltr">
      <ResponsiveContainer height={400} className="dashboard__active-users-chart">
        <BarChart
          width={600}
          height={220}
          data={data}
          layout="vertical"
          barGap={0}
          barCategoryGap={0}
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            type="number"
            reversed={dir === 'rtl'}
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={true}
            verticalAnchor="start"
            orientation={dir === 'rtl' ? 'right' : 'left'}
          />
         <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} /> 
          <Bar dataKey="now" fill="#48b5ff" barSize={13} />
          <Bar dataKey="earlier" fill="#7edbff" barSize={13} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </Panel>
);

AppTileClicks.propTypes = {
  dir: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  hoursUpdated: PropTypes.number.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(AppTileClicks);
