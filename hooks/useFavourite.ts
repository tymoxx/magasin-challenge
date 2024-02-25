import {addFavourite, removeFavourite} from "@/features/favourites/favouritesSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxTypes";

export const useFavourite = (flightNumber: string) => {
    const dispatch = useAppDispatch();
    const favourites = useAppSelector((state) => state.favourites.favourites);
    const isFavourite = favourites.includes(flightNumber);

    const toggleFavourite = () => {
        if (isFavourite) {
            dispatch(removeFavourite(flightNumber));
        } else {
            dispatch(addFavourite(flightNumber));
        }
    };

    return { isFavourite, toggleFavourite };
};
