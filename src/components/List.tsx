import { useState, useEffect } from 'react';
import departmentData from '../constants/DepartmentData';
import {
  List, ListItem, ListItemText, Collapse, Checkbox,
  ListItemIcon
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


interface Department {
  department: string;
  sub_departments: string[];
}

const DepartmentList = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: string]: boolean }>({});
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    console.log(selectedDepartments);
  }, [selectedDepartments]);

  useEffect(() => {
    console.log(selectedSubDepartments);
  }, [selectedSubDepartments]);

  const handleToggleExpand = (department: string) => {
    setExpanded((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleDepartmentSelect = (department: string) => {
    const isSelected = selectedDepartments[department];
    setSelectedDepartments((prev) => ({ ...prev, [department]: !isSelected }));
  
    const subDepartments = departmentData.find((dept) => dept.department === department)?.sub_departments || [];
    setSelectedSubDepartments((prev) => ({
      ...prev,
      [department]: !isSelected ? subDepartments : []
    }));
  };
  

  const handleSubDepartmentSelect = (department: string, sub_department: string) => {
    setSelectedSubDepartments((prev) => {
      const currentSelected = prev[department] || [];
      const newSelected = currentSelected.includes(sub_department)
        ? currentSelected.filter((sub) => sub !== sub_department)
        : [...currentSelected, sub_department];
      
      return { ...prev, [department]: newSelected };
    });

    setSelectedDepartments((prevDepartments) => {
      const allSubDepartments = departmentData.find((dept) => dept.department === department)?.sub_departments || [];
      const newSelectedSubDepartments = selectedSubDepartments[department]?.includes(sub_department)
        ? selectedSubDepartments[department].filter((sub) => sub !== sub_department)
        : [...(selectedSubDepartments[department] || []), sub_department];

      const allSelected = allSubDepartments.every((sub) =>
        newSelectedSubDepartments.includes(sub)
      );

      return { ...prevDepartments, [department]: allSelected };
    });
  };


  return (
    <List>
      {departmentData.map(({ department, sub_departments }: Department) => (
        <div key={department}>
          <ListItem button onClick={() => handleToggleExpand(department)}>
            <ListItemIcon>
              <Checkbox
                checked={selectedDepartments[department] || false}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => {event.stopPropagation();
                   handleDepartmentSelect(department)}}
              />
            </ListItemIcon>
            <ListItemText primary={department} />
            {expanded[department] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded[department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sub_departments.map((sub_department) => (
                <ListItem key={sub_department} button style={{ paddingLeft: 32 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={
                        selectedDepartments[department] ||
                        (selectedSubDepartments[department] || []).includes(sub_department)
                      }
                      onChange={() => handleSubDepartmentSelect(department, sub_department)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub_department} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;