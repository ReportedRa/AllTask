import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
    const decodedList = [];
    const uniqueIds = new Set();
  
    encoded.forEach(item => {
      const decodedItem = {};
  
      for (const key in item) {
        if (key === "groupId" || key === "service" || key === "formatSize" || key === "ca") {
          decodedItem[key] = item[key];
        } else if (key.endsWith("id")) {
          const value = item[key];
          const translation = translations[value];
          if (translation) {
            decodedItem[key] = translation;
            uniqueIds.add(value);
          } else {
            decodedItem[key] = value; 
          }
        }
      }
  
      decodedList.push(decodedItem);
    });
  
    const uniqueIdsList = Array.from(uniqueIds);
  
    return { decodedList, uniqueIdsList };
  }
  
  const encodedData = [
    { groupId: 1, service: "A", formatSize: "large", itemId: 101, userId: 201 },
    { groupId: 2, service: "B", formatSize: "small", itemId: 102, userId: 202 },
  ];
  
  const translations = {
    101: "Item 1",
    102: "Item 2",
    201: "User 1",
  };
  
  const result = decodeFields(encodedData, translations);
  console.log(result.decodedList);
  console.log(result.uniqueIdsList);
  
