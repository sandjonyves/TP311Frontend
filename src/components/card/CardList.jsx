import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PrototypeServices from '../../services/api/PrototypeServices';
import { useParams } from 'react-router-dom';

export default function CardList() {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loadingIndexes, setLoadingIndexes] = React.useState({});
  const dispatch = useDispatch();
  const cardsSelector = useSelector((state) => state.Prototype);

  const { school_id } = useParams();

  // Vérifie si un prototype est déjà choisi
  const isPrototypeChosen = cardsSelector.prototypes.some(
    (item) => item.choice && item.school_choice.includes(parseInt(school_id))
  );

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

  // Fonction pour gérer le clic sur "Choisir"
  const handleChoice = async (index) => {
    setLoadingIndexes((prev) => ({ ...prev, [index]: true }));

    try {
      await PrototypeServices.setPrototypeChoice(dispatch, cardsSelector.prototypes[index].id, school_id);
      await PrototypeServices.getPrototype(dispatch);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du choix:', error);
    } finally {
      setLoadingIndexes((prev) => ({ ...prev, [index]: false }));
    }
  };

  // Fonction pour gérer le clic sur "Désélectionner"
  const handleUnChoice = async (index) => {
    setLoadingIndexes((prev) => ({ ...prev, [index]: true }));

    try {
      await PrototypeServices.setPrototypeUnChoice(dispatch, cardsSelector.prototypes[index].id, school_id);
      await PrototypeServices.getPrototype(dispatch);
    } catch (error) {
      console.error('Erreur lors de la désélection:', error);
    } finally {
      setLoadingIndexes((prev) => ({ ...prev, [index]: false }));
    }
  };

  // Charger les prototypes au montage
  React.useEffect(() => {
    PrototypeServices.getPrototype(dispatch);
  }, [dispatch]);

  return (
    <div>
      <ImageList cols={5} gap={12}>
        {cardsSelector.prototypes.map((item, index) => (
          <ImageListItem key={item.id} style={{ margin: 10 }}>
            <img
              srcSet={`${item.image}`}
              src={`${item.image}`}
              loading="lazy"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
              }}
              className="image-hover-effect"
              onClick={() => handleImageClick(item.image)}
            />
            <ImageListItemBar title={item.title} />
            <div className="flex justify-end space-x-5">
             {!item.choice
             ? <Button
             variant="contained"
             color={item.choice ? 'success' : 'primary'}
             disabled={isPrototypeChosen && !item.choice }
             onClick={() => handleChoice(index)}
           >
             {loadingIndexes[index] ? (
               <CircularProgress size={20} color="inherit" />
             ) : item.choice ? 'Choisi' : 'Choisir'}
           </Button>
           :null
             
             }
              {item.choice && item.school_choice.includes(parseInt(school_id)) && (
                <Button
                  variant="outlined"
                  color="error"
                  // disabled={loadingIndexes[index]}
                  onClick={() => handleUnChoice(index)}
                >
                  {loadingIndexes[index] ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : 'Désélectionner'}
                </Button>
              )}
            </div>
          </ImageListItem>
        ))}
      </ImageList>

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
              transition: 'transform 0.3s ease',
            }}
          />
        </DialogContent>
      </Dialog>

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
