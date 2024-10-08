import React from 'react'
import { Modal } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { LatLng } from 'react-native-maps'

import { RoundButton } from '../RoundButton'
import { StyledFlatList, useStyles } from './DestinationModal.styles'
import { FlatListHeader } from './components/FlatListHeader'
import { useDestinationModal } from './useDestinationModal'
import type { TextSearchItem } from 'models/types/TextSearchItem'
import { PlaceItem } from 'components/PlaceItem'
import { Spacer } from 'components/common/Spacer'

interface DestinationModalProps {
    visible: boolean;
    closeModal: () => void;
    onPlaceItemPress: (coords: LatLng) => void;
}

const ItemSeparatorComponent = () => <Spacer height={scale(17)}/> 

export const DestinationModal = ({
    visible,
    closeModal, 
    onPlaceItemPress,
}: DestinationModalProps) => {
    const {models, operations} = useDestinationModal({
        onPlaceItemPress, 
        closeModal,
    });
    const insets = useSafeAreaInsets();
    const styles = useStyles(insets)

    const renderFlatListItem = ({item}: {item: TextSearchItem}) => {
        return (
            <PlaceItem 
                key={item.place_id}
                name={item.name} 
                iconUrl={item.icon} 
                address={item.formatted_address}
                onPress={operations.handlePlaceItemPress(item)}
            />
        )
    }
    return (
        <Modal onDismiss={operations.handleModalDismiss} onRequestClose={closeModal} visible={visible} animationType='fade'>
            <StyledFlatList 
                stickyHeaderIndices={[0]} // make the header stick at the same place
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                data={models.textSearchQueryResponseData} 
                renderItem={renderFlatListItem} 
                ItemSeparatorComponent={ItemSeparatorComponent}
                contentContainerStyle={styles.flatListContainer}
                ListHeaderComponent=
                {
                    <FlatListHeader 
                        destinationValue={models.destinationInputValue}
                        onDestinationTextChange={
                            operations.handleDestinationInputTextChange
                        }
                    />
                }
            />
            <RoundButton icon="arrow-back-outline" onPress={operations.handleRoundButtonPress} />
        </Modal>
    )
}