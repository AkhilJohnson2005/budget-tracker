import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter,
  CartesianGrid
} from "recharts";
import "./Analytics.css";

const PIE_COLORS = ["#818cf8", "#4ade80", "#f472b6", "#f59e0b", "#60a5fa", "#a78bfa", "#34d399", "#94a3b8"];

const TABS = ["Overview", "Categories", "Trends", "Comparison", "Heatmap"];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const Analytics = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const d = new Date(t.date);
      if (isNaN(d)) return;
      const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      if (!map[key]) map[key] = { month: key, Income: 0, Expense: 0, Balance: 0, _ts: d.getTime() };
      if (t.type === "income") map[key].Income += Number(t.amount);
      else map[key].Expense += Number(t.amount);
    });
    return Object.values(map)
      .sort((a, b) => a._ts - b._ts)
      .map((m) => ({ ...m, Balance: m.Income - m.Expense }));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount);
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const balanceTrend = useMemo(() => {
    let running = 0;
    return monthlyData.map((m) => {
      running += m.Balance;
      return { month: m.month, Balance: running };
    });
  }, [monthlyData]);

  const scatterData = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .map((t) => {
        const d = new Date(t.date);
        return {
          x: isNaN(d) ? 0 : d.getMonth(),
          y: Number(t.amount),
          category: t.category,
        };
      });
  }, [transactions]);

  const heatmapData = useMemo(() => {
    const cats = [...new Set(transactions.filter(t => t.type === "expense").map(t => t.category))];
    const months = [...new Set(transactions.map(t => {
      const d = new Date(t.date);
      return isNaN(d) ? null : `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    }).filter(Boolean))].sort();
    const grid = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      const d = new Date(t.date);
      if (isNaN(d)) return;
      const mo = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      const key = `${t.category}__${mo}`;
      grid[key] = (grid[key] || 0) + Number(t.amount);
    });
    return { cats, months, grid };
  }, [transactions]);

  const maxHeat = useMemo(() => {
    return Math.max(1, ...Object.values(heatmapData.grid));
  }, [heatmapData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="an-tooltip">
          <p className="an-tooltip-label">{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }}>
              {p.name}: ₹{p.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderOverview = () => (
    <div className="an-section">
      <div className="an-chart-block">
        <h3 className="an-chart-title">Income vs Expense Trend</h3>
        <p className="an-chart-sub">Monthly financial overview</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Income" fill="#4ade80" radius={[4,4,0,0]} />
            <Bar dataKey="Expense" fill="#f87171" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="an-chart-block">
        <h3 className="an-chart-title">Balance Trend</h3>
        <p className="an-chart-sub">Net balance over time</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={balanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="Balance" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4, fill: "#60a5fa" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="an-section">
      <div className="an-two-col">
        <div className="an-chart-block">
          <h3 className="an-chart-title">Expense Distribution</h3>
          <p className="an-chart-sub">Breakdown by category</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="an-chart-block">
          <h3 className="an-chart-title">Category Spending</h3>
          <p className="an-chart-sub">Amount spent per category</p>
          <div className="an-cat-bars">
            {categoryData.map((c, i) => (
              <div key={i} className="an-cat-row">
                <span className="an-cat-name">{c.name}</span>
                <div className="an-bar-wrap">
                  <div
                    className="an-bar-fill"
                    style={{
                      width: `${(c.value / (categoryData[0]?.value || 1)) * 100}%`,
                      background: PIE_COLORS[i % PIE_COLORS.length],
                    }}
                  />
                </div>
                <span className="an-cat-amt">₹{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="an-section">
      <div className="an-chart-block">
        <h3 className="an-chart-title">Monthly Income</h3>
        <p className="an-chart-sub">Income trend over time</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="Income" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="an-chart-block">
        <h3 className="an-chart-title">Monthly Expense</h3>
        <p className="an-chart-sub">Expense trend over time</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="Expense" stroke="#f87171" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderComparison = () => (
    <div className="an-section">
      <div className="an-chart-block">
        <h3 className="an-chart-title">Income vs Expense Comparison</h3>
        <p className="an-chart-sub">Side-by-side monthly view</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Income" fill="#4ade80" radius={[4,4,0,0]} />
            <Bar dataKey="Expense" fill="#f87171" radius={[4,4,0,0]} />
            <Bar dataKey="Balance" fill="#818cf8" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderHeatmap = () => {
    const { cats, months, grid } = heatmapData;
    if (!cats.length || !months.length) {
      return (
        <div className="an-section">
          <div className="an-chart-block">
            <p style={{ color: "#6b7280" }}>No expense data available for heatmap.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="an-section">
        <div className="an-chart-block">
          <h3 className="an-chart-title">Spending Heatmap</h3>
          <p className="an-chart-sub">Spending intensity by category and month</p>
          <div className="an-heatmap-wrap">
            <div className="an-heatmap">
              <div className="an-heatmap-row">
                <div className="an-heatmap-cell an-heatmap-header" />
                {months.map((m) => (
                  <div key={m} className="an-heatmap-cell an-heatmap-header">{m}</div>
                ))}
              </div>
              {cats.map((cat) => (
                <div key={cat} className="an-heatmap-row">
                  <div className="an-heatmap-cell an-heatmap-label">{cat}</div>
                  {months.map((mo) => {
                    const val = grid[`${cat}__${mo}`] || 0;
                    const intensity = val / maxHeat;
                    return (
                      <div
                        key={mo}
                        className="an-heatmap-cell an-heatmap-data"
                        title={`${cat} / ${mo}: ₹${val}`}
                        style={{
                          background: val
                            ? `rgba(129, 140, 248, ${0.15 + intensity * 0.85})`
                            : "#f8fafc",
                        }}
                      >
                        {val ? `₹${val >= 1000 ? (val/1000).toFixed(1)+"k" : val}` : ""}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="an-heatmap-legend">
              <span>Low</span>
              <div className="an-heatmap-grad" />
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="an-chart-block">
          <h3 className="an-chart-title">Scatter Plot</h3>
          <p className="an-chart-sub">Expense amount by month</p>
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="x"
                name="Month"
                tickFormatter={(v) => MONTHS[v] || v}
                tick={{ fontSize: 11 }}
              />
              <YAxis dataKey="y" name="Amount" tick={{ fontSize: 11 }} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(v, name) => name === "Amount" ? `₹${v}` : v}
              />
              {[...new Set(scatterData.map(d => d.category))].map((cat, i) => (
                <Scatter
                  key={cat}
                  name={cat}
                  data={scatterData.filter(d => d.category === cat)}
                  fill={PIE_COLORS[i % PIE_COLORS.length]}
                />
              ))}
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const tabContent = {
    Overview: renderOverview,
    Categories: renderCategories,
    Trends: renderTrends,
    Comparison: renderComparison,
    Heatmap: renderHeatmap,
  };

  return (
    <div className="analytics-page">
      <div className="an-header">
        <h1 className="an-title">Analytics & Reports</h1>
        <p className="an-subtitle">Comprehensive insights into your spending habits</p>
      </div>

      <div className="an-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`an-tab${activeTab === tab ? " an-tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabContent[activeTab]?.()}
    </div>
  );
};

export default Analytics;
