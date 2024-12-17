import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button, Dialog, DialogContent } from '@mui/material';

export default function CardList() {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Fonction pour ouvrir le modal avec l'image sélectionnée
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  // Fonction pour fermer le modal
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Liste d'images */}
      <ImageList cols={3} gap={12}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} style={{ margin: 10 }}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
              }}
              className="image-hover-effect"
              onClick={() => handleImageClick(item.img)}
            />
            <ImageListItemBar title={item.title} />
            <div className="flex justify-end space-x-5">
              <Button variant="contained" color="primary">
                Choise
              </Button>
            </div>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Modal pour afficher l'image agrandie */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: { backgroundColor: 'transparent', boxShadow: 'none' },
        }}
      >
        <DialogContent
          style={{
            padding: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={selectedImage}
            alt="Agrandie"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '800px',
              borderRadius: '8px',
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Effet Hover CSS */}
      <style>
        {`
          .image-hover-effect:hover {
            transform: scale(1.05);
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
