import React, { useState, useEffect } from 'react';
import Column from './columns';
import axios from 'axios';

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status'); // Default grouping by status

  useEffect(() => {
    // Fetch tickets from API using axios or fetch
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortingOption = localStorage.getItem('sortingOption');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }

    if (savedSortingOption) {
      setSortingOption(savedSortingOption);
    }

    // Fetch tickets from API using axios or fetch
    axios.get('https://apimocha.com/quicksell/data.').then(response => {
      setTickets(response.data);
    });
  }, []);

  useEffect(() => {
    // Save grouping and sorting options to localStorage
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('sortingOption', sortingOption);
  }, [groupingOption, sortingOption]);

  
    const groupTickets = () => {
        let groupedData = [];
      
        if (groupingOption === 'status') {
          // Group tickets by status
          const statusGroups = ['To Do', 'In Progress', 'Done'];
      
          statusGroups.forEach(status => {
            const ticketsForStatus = tickets.filter(ticket => ticket.status === status);
            groupedData.push({ title: status, tickets: ticketsForStatus });
          });
        } else if (groupingOption === 'user') {
          // Group tickets by user
          const uniqueUsers = [...new Set(tickets.map(ticket => ticket.user))];
      
          uniqueUsers.forEach(user => {
            const ticketsForUser = tickets.filter(ticket => ticket.user === user);
            groupedData.push({ title: user, tickets: ticketsForUser });
          });
        } else if (groupingOption === 'priority') {
          // Group tickets by priority
          const priorityGroups = ['Urgent', 'High', 'Medium', 'Low', 'No priority'];
      
          priorityGroups.forEach(priority => {
            const ticketsForPriority = tickets.filter(ticket => ticket.priority === priority);
            groupedData.push({ title: priority, tickets: ticketsForPriority });
          });
        }
      
        return groupedData;
      };
      

  return (
    <div className="boards">
      {sortedAndGroupedTickets.map(group => (
        <Column
          key={group.title}
          title={group.title}
          cards={group.tickets}
          sortingOption={sortingOption} // Pass sorting option to each column
        />
      ))}
    </div>
  );

  return (
    <div className="boards">
      <div className="controls">
        <button onClick={() => handleGroupingChange('status')}>Group by Status</button>
        <button onClick={() => handleGroupingChange('user')}>Group by User</button>
        <button onClick={() => handleGroupingChange('priority')}>Group by Priority</button>
        <button onClick={() => handleSortingChange('priority')}>Sort by Priority</button>
        <button onClick={() => handleSortingChange('title')}>Sort by Title</button>
      </div>
      {/* Render columns and cards */}
    </div>
 );
};


export default boards;
 