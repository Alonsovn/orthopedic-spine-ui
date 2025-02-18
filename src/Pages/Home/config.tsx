import brain from "../../Assets/images/brain.png";
import column from "../../Assets/images/column.png";
import rehabilitation from "../../Assets/images/rehabilitation.png";
import hands from "../../Assets/images/hands.png";
import legs from "../../Assets/images/legs.png";
import { ServicesCard } from "../../Components/AppCarousel/types";

export const servicesCardsItems: ServicesCard[] = [
  {
    id: 1,
    title: "Cabeza",
    description:
      "Atención especializada para el cuidado y tratamiento de lesiones o afecciones en la cabeza.",
    alt: "Cabeza",
    image: brain,
  },
  {
    id: 2,
    title: "Columna",
    description:
      "Tratamientos para problemas de la columna vertebral, como dolores, hernias y fracturas.",
    alt: "Columna",
    image: column,
  },
  {
    id: 3,
    title: "Brazos",
    description:
      "Recuperación y tratamientos para lesiones en los brazos, muñecas y codos.",
    alt: "Brazos",
    image: hands,
  },
  {
    id: 4,
    title: "Piernas",
    description:
      "Soluciones para lesiones en las piernas, rodillas, tobillos y pies.",
    alt: "Piernas",
    image: legs,
  },
  {
    id: 5,
    title: "Rehabilitación",
    description:
      "Programas de rehabilitación para recuperar la movilidad y fuerza en cualquier parte del cuerpo.",
    alt: "Rehabilitación",
    image: rehabilitation,
  },
];
