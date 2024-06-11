package literaconnect.literaconect.dto;

import literaconnect.literaconect.model.Genero;

public record LivroDTO(Long id, 
					   String titulo,
					   String descricao,
					   String imagem,
					   String dataPublicacao,
					   Genero categorias) {

}
