import { action, observable, autorun} from "mobx";

export class UIStore {

    @observable language = "en";


    @observable menuOpened = false;

    @observable offline = !navigator.onLine;

    @action toggleMenu = () => {
        this.menuOpened = !this.menuOpened;
    }




}