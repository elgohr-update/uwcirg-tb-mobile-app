import React from 'react'
import { DateTime } from 'luxon';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from './InteractionCard';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import { useTranslation } from 'react-i18next';
import ClickableText from '../../Basics/ClickableText';
import { makeStyles } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import CheckIcon from '@material-ui/icons/Check';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({
    confirmation:{
        ...Styles.flexRow,
        marginBottom: "1em",
        alignContent: "center"
    },
    confirmationText:{
        ...Styles.flexColumn,
        paddingLeft: "1em",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "50%",
        textAlign: "left",
    },
    check:{
        color: Colors.approvedGreen,
        fontSize: "2.5em",
    },
    confirmationHeader: {
        ...Styles.flexRow,
        fontSize: "1.25em",
        margin: 0,
        "& > svg": {
            color: Colors.approvedGreen,
            marginLeft: ".5em"
        }
    }
})

const ActionBox = observer(() => {

    const {patientStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleReportClick = () =>{
        patientStore.uiState.onTreatmentFlow = true;
    }

    const handlePhotoClick = () =>{
        patientStore.uiState.onTreatmentFlow = true;
        patientStore.uiState.onPhotoFlow = true;
    }

    return(
        <InteractionCard upperText={t("patient.home.todaysActions.title")}>
            {patientStore.dailyActionsCompleted ? 
            <>
            <Confirmation onClick={patientStore.openReportConfirmation} />
            </>
             :
            <>
            <NewButton positive={patientStore.report.hasSubmitted} onClick={handleReportClick} icon={<Clipboard />} text={t("patient.home.todaysActions.logMedication")} />
            {patientStore.isPhotoDay && <NewButton positive={patientStore.report.hasSubmittedPhoto} onClick={handlePhotoClick} icon={<Camera />} text={t("patient.home.todaysActions.uploadPhoto")} />} 
            </>
            }
        </InteractionCard>)
});

const Confirmation = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.confirmation}>
            <DoctorIcon />
            <div className={classes.confirmationText}>
                <div className={classes.confirmationHeader}>Complete<CheckIcon /></div>
                <p>Todays Report Has Been Submitted</p>
                <ClickableText onClick={props.onClick} hideIcon text={"Modify your report"}/>
            </div>
        </div>
    )


}

export default ActionBox;