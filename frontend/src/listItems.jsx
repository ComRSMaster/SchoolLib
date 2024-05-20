import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Главная" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Избранное" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Профиль" />
    </ListItemButton>
  </React.Fragment>
);

export const adminListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Админка
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Пользователи" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Книги" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookmarksIcon />
      </ListItemIcon>
      <ListItemText primary="Брони" />
    </ListItemButton>
  </React.Fragment>
);