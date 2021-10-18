import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es-mx'; // Importar idioma en moment
import { messages } from '../../helpers/calendar-messages';
import Navbar from "../ui/Navbar";
import CalendarEvent from './CalendarEvent';
import { useEffect, useState } from 'react';
import CalendarModal from './CalendarModal';
import { uiOpenModal } from '../../actions/uiActions';
import { eventSetActive, eventStartLoading, eventUnsetActive } from '../../actions/eventActions';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es-mx');// cambiar el idioma a moment

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const onDoubleClick = () => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = e => {
        // console.log(e);
        dispatch( eventSetActive( e ) );
        // dispatch( uiOpenModal() );
    }

    const onViewChange = e => {
        setLastView( e );
        localStorage.setItem( 'lastView', e );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // console.log({ event, start, end, isSelected });

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return { style };
    }

    const onSelectSlot = e => {
        // console.log(e);
        dispatch( eventUnsetActive() );
    }

    //diparar accion para obtener eventos de la base de datos
    useEffect(() => {
        
        dispatch( eventStartLoading() );

    }, [ dispatch ])

    return (
        <div className="altura">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ 
                    height: 500,
                    backgroundColor: 'beige'
                }}
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                // onDoubleClick={ () => { console.log( 'adfdsf' ) } }
                selectable={true}                
                
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                activeEvent && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
        
    )    
}

export default CalendarScreen;