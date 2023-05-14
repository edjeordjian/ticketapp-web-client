const CREATED_EVENT_LBL = "Evento creado";

const EVENT_DELETED = "Evento borrado"

const UPDATED_EVENT_LBL = "Evento actualizado";

const UPLOAD_IMAGE_ERR_LBL = "Error al subir las imágenes";

const GET_EVENT_ERROR = "Error al buscar el evento.";

const IMAGE_TOO_SMALL_ERR_LBL = "El tamaño mínimo de imágenes es 1920x1080";

const MEMBERS_ADDED_TO_GROUP_LBL = "Gente de staff agregada al grupo";

const MIN_WIDTH = 1920;

const MIN_HEIGHT = 1080;

const MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const DRAFT_STATUS_LBL = "Borrador";

const CANCELLED_STATUS_LBL = "Cancelado";

const SUSPENDED_STATUS_LBL = "Suspendido";

const FINISHED_STATUS_LBL = "Finalizado";

const PUBLISHED_STATUS_LBL = "Publicado";

export {
    CREATED_EVENT_LBL, UPLOAD_IMAGE_ERR_LBL, GET_EVENT_ERROR, IMAGE_TOO_SMALL_ERR_LBL,
    MIN_WIDTH, MIN_HEIGHT, MAPS_KEY, MEMBERS_ADDED_TO_GROUP_LBL, DRAFT_STATUS_LBL,
    CANCELLED_STATUS_LBL,SUSPENDED_STATUS_LBL,FINISHED_STATUS_LBL, PUBLISHED_STATUS_LBL,
    UPDATED_EVENT_LBL,EVENT_DELETED
};
