package literaconnect.literaconect.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Item(@JsonAlias("volumeInfo") VolumeInfo volume) {

	public VolumeInfo getVolume() {
		return volume;
	}
}
