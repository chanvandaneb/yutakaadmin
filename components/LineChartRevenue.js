"use client";
import { Line } from "react-chartjs-2";

import {useEffect, useState} from "react";
import axios from "axios";
import SpinnerLogo from "@/components/SpinnerLogo";
import React from "react";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);



function LineChart() {





  const [orders,setOrders] = useState([]);
  const [isLoading,setIsLoading] = useState(false);



  useEffect(() => {
      setIsLoading(true);
      axios.get('/api/orders').then(res => {
          setOrders(res.data);
          setIsLoading(false);
      });
  }, []);

  if (isLoading) {
      return (
          <div className="my-4">
              <SpinnerLogo fullWith={true}/>
          </div>
      );
  }













function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}


function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}


function filterOrdersForMonth(orders, year, month) {
  var firstDayOfMonth = getFirstDayOfMonth(year, month);
  var lastDayOfMonth = getLastDayOfMonth(year, month);

  return orders.filter(o => new Date(o.createdAt) >= firstDayOfMonth && new Date(o.createdAt) <= lastDayOfMonth);
}






var salesData = [];

for (var i = 0; i < 12; i++) {
  var currentMonthOrderNumber = filterOrdersForMonth(orders, 2023, i); 


  salesData.push({ month: getMonthName(i), sales: currentMonthOrderNumber });
}

console.log(salesData)


function getMonthName(index) {
  var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return months[index];
}







function ordersTotal(orders) {
  let sum = 0;
  orders.forEach(order => {
      const {line_items} = order;
      line_items.forEach(li => {
          const lineSum = li.quantity * li.price_data.unit_amount / 100;
          sum += lineSum;
      });
  });
  return new Intl.NumberFormat('sv-SE').format(sum);
}








  const data = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: "Sale Data",
        data: salesData.map((data) => data.ordersTotal(sales)),
        borderColor: "#4F46E5",
        borderWidth: 3,
        pointBorderColor: "#4F46E5",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#4F46E5");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "",
          },
        },
        title: {
          display: true,
          text: "Sales",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic",
          },
        },
        min: 0,
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "",
          },
        },
      },
    },
  };

  return (
    <div>
      <div
        style={{
          width: "900px",
          height: "400px",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

export default LineChart;